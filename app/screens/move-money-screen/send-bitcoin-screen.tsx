import { useNavigation } from "@react-navigation/native"
import * as lightningPayReq from 'bolt11'
import { inject, observer } from "mobx-react"
import * as React from "react"
import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, Clipboard, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native"
import { RNCamera } from "react-native-camera"
import { Button, Input } from "react-native-elements"
import { Switch } from "react-native-gesture-handler"
import ReactNativeHapticFeedback from "react-native-haptic-feedback"
import Icon from "react-native-vector-icons/Ionicons"
import { Onboarding } from "types"
import { Screen } from "../../components/screen"
import { translate } from "../../i18n"
import { color } from "../../theme"
import { palette } from "../../theme/palette"
import { getDescription } from "../../utils/lightning"
import functions from "@react-native-firebase/functions"

const CAMERA: ViewStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: color.primary,
    marginVertical: 8,
  },

  horizontalContainer: {
    // flex: 1,
    flexDirection: "row",
  },

  icon: {
    color: palette.darkGrey,
    marginRight: 15,
  },

  invoiceContainer: {
    alignSelf: "flex-end",
    flex: 1,
  },

  mainView: {
    paddingHorizontal: 20,
  },

  note: {
    color: palette.darkGrey,
    fontSize: 18,
    marginLeft: 10,
    textAlign: "left",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
  },

  section: {
    paddingBottom: 8,
    paddingTop: 12,
  },

  smallText: {
    color: palette.darkGrey,
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
  },

  squareButton: {
    backgroundColor: color.primary,
    height: 70,
    width: 70,
  },
})

export const ScanningQRCodeScreen = inject("dataStore")(
  observer(({ dataStore }) => {
    const { navigate } = useNavigation()

    const pasteInvoice = async () => {
      decodeInvoice(await Clipboard.getString())
    }

    const decodeInvoice = async (data) => {
      try {
        let [protocol, invoice] = data.split(":")
        console.tron.log({ protocol, invoice })
        if (protocol === "bitcoin") {
          Alert.alert("We're integrating Loop in. Use Lightning for now")
          return
        } else if (protocol.startsWith("ln") && invoice === undefined) {
          // it might start with 'lightning:'
          invoice = protocol
        } else if (protocol.toLowerCase() !== "lightning") {
          let message = `Only lightning procotol is accepted for now.`
          message += message === "" ? "" : `\n\ngot following invoice: "${protocol}"`
          Alert.alert(message)
          return
        }

        const payReq = lightningPayReq.decode(invoice)
        console.tron.log({ payReq })

        let amount, amountless, note

        if (payReq.satoshis || payReq.millisatoshis) {
          amount = payReq.satoshis ?? Number(payReq.millisatoshis) * 1000
          amountless = false
        } else {
          amount = 0
          amountless = true
        }

        note = getDescription(payReq) ?? `this invoice doesn't include a note`

        navigate("sendBitcoin", { invoice, amount, amountless, note })
      } catch (err) {
        Alert.alert(err.toString())
      }
    }

    return (
      <Screen>
        <RNCamera
          style={CAMERA}
          captureAudio={false}
          onBarCodeRead={(event) => {
            const qr = event.data
            decodeInvoice(qr)
          }}
        />
        <View style={styles.overlay}>
          <Button
            buttonStyle={[styles.buttonStyle, { width: 180 }]}
            title="Paste"
            onPress={pasteInvoice}
          />
        </View>
      </Screen>
    )
  }),
)

export const SendBitcoinScreen: React.FC = inject("dataStore")(
  observer(({ dataStore, route }) => {
    const invoice = route.params.invoice
    const amountless = route.params.amountless
    const note = route.params.note
    const amount = route.params.amount

    const [manualAmount, setManualAmount] = useState(false)

    const { goBack } = useNavigation()

    const [useUSD, setUseUSD] = useState(false)
    const [message, setMessage] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    type payInvoiceResult = boolean | Error

    const onUseUSDChange = async (input) => {
      setUseUSD(input)

      if (input) {
        await dataStore.exchange.quoteLNDBTC({ side: "buy", satAmount: amount })
      } else {
        dataStore.exchange.quote.reset()
      }
    }

    const payInvoice = async () => {
      if (invoice === "") {
        Alert.alert(`You need to paste an invoice or scan a QR Code`)
        return
      }

      if (amountless) {
        if (amount === 0) {
          Alert.alert(
            `This invoice doesn't have an amount, so you need to manually specify an amount`,
          )
          return
        }

        // FIXME what is it for?
        // payreq.amt = amount
      }

      console.tron.log("payreq", invoice)

      setLoading(true)
      try {
        if (useUSD) {
          const success = await dataStore.exchange.buyLNDBTC()

          if (!success) {
            setErr(translate("errors.generic"))
            return
          }
        }

        const result: payInvoiceResult = await functions().httpsCallable("payInvoice")({invoice})

        console.tron.log({result})

        if (result === true) {
          setMessage("Payment succesfull")
          await dataStore.onboarding.add(Onboarding.firstLnPayment)
        } else {
          setErr(result.toString())
        }
      } catch (err) {
        setErr(err.toString())
      }
    }

    useEffect(() => {
      if (message !== "" || err !== "") {
        const header = err ? "error" : "success"

        const options = {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false,
        }

        const haptic_feedback = err !== "" ? "notificationError" : "notificationSuccess"
        ReactNativeHapticFeedback.trigger(haptic_feedback, options)

        Alert.alert(header, message || err, [
          {
            text: translate("common.ok"),
            onPress: () => {
              goBack("moveMoney")
              setLoading(false)
            },
          },
        ])
        setMessage("")
        setErr("")
      }
    }, [message, err])

    return (
      <Screen>
        <ScrollView style={styles.mainView}>
          <View style={styles.section}>
            <Text style={styles.smallText}>{translate("common.to")}</Text>
            <View style={styles.horizontalContainer}>
              <Input
                placeholder="Invoice"
                leftIcon={
                  <Icon name="ios-log-out" size={24} color={color.primary} style={styles.icon} />
                }
                value={invoice}
                containerStyle={styles.invoiceContainer}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.smallText}>{translate("SendBitcoinScreen.amount")}</Text>
            <Input
              leftIcon={<Text style={styles.icon}>{translate("common.sats")}</Text>}
              onChangeText={(input) => setManualAmount(+input)}
              value={amountless ? manualAmount.toString() : amount.toString()}
              disabled={!amountless}
              returnKeyType="done"
              keyboardType="number-pad" // TODO, there should be no keyboard here
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.smallText}>{translate("SendBitcoinScreen.note")}</Text>
            <Text style={styles.note}>{note}</Text>
          </View>
          <View style={[styles.horizontalContainer, { marginTop: 8 }]}>
            <Text style={[styles.smallText, { paddingTop: 5 }]}>
              {translate("SendBitcoinScreen.payFromUSD")}
            </Text>
            <View style={{ flex: 1 }} />
            <Switch value={useUSD} onValueChange={(input) => onUseUSDChange(input)} />
          </View>
          {useUSD && (
            <View style={[styles.horizontalContainer, { marginTop: 8 }]}>
              <Text style={styles.smallText}>{translate("SendBitcoinScreen.cost")}</Text>
              <View style={{ flex: 1 }} />
              {(isNaN(dataStore.exchange.quote.satPrice) && <ActivityIndicator />) || (
                <Text style={styles.smallText}>
                  $
                  {(dataStore.exchange.quote.satPrice * dataStore.exchange.quote.satAmount).toFixed(
                    3,
                  )}
                </Text>
              )}
            </View>
          )}
          <Button
            buttonStyle={styles.buttonStyle}
            title="Send"
            onPress={payInvoice}
            disabled={invoice === ""}
            loading={loading}
          />
        </ScrollView>
      </Screen>
    )
  }),
)
