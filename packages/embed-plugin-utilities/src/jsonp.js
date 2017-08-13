import isBrowser from "is-in-browser"

let count = 0

function jsonP(url) {
	return new Promise(resolve => {
		const cb = `__c${count++}`
		const param = "callback"
		const query = `${param}=${cb}`
		const script = document.createElement("script")

		const cleanup = () => {
			document.head.removeChild(script)
			window[cb] = () => {}
		}

		window[cb] = data => {
			resolve({
				json: () => Promise.resolve(data)
			})
			cleanup()
		}

		script.src = `${url}&${query}`
		document.head.appendChild(script)
	})
}

let unfetch
if (!isBrowser) {
	unfetch = require("node-fetch")
}

export default unfetch || jsonP
