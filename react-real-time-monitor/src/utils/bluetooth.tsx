import * as React from "react";

// export interface Esp32{
// 	connect: () => void,
// 	isConnected: boolean,
// 	toggle: () => void
// }

// export const useEsp32 = (): Esp32 =>{
// 	const [isConnected, setIsConnected] = React.useState(false);
// 	const [toggleCharacteristic, setToggleCharacteristic] = 
// 		React.useState<BluetoothRemoteGATTCharacteristic|null>(null)
		
// 	const connect = async () => {
// 		const device = await navigator.bluetooth.requestDevice({
// 			filters: [
// 				{namePrefix: ""}										// !!!
// 			],
// 			optionalServices: ["123"]								// !!!
// 		});
		
// 		const server = await device.gatt?.connect();
		
// 		const service = await server?.getPrimaryService(
// 			"123"
// 			);
			
// 		const toggleChar = await service?.getCharacteristic(
// 			"123"
// 		);
		
// 		setToggleCharacteristic(toggleChar);
// 		setIsConnected(true);
// 	};
	
// 	const toggle = async () => {
// 		const currentValue = await toggleCharacteristic?.readValue();
// 		const lightIsCurrentlyOn = currentValue?.getUint8(0) ? true : false
// 		await toggleCharacteristic?.writeValue(
// 			new Uint8Array([ ? 0x0 : 0x])
// 		)
// 	};
	
		
// 	return {
// 		connect, toggle, isConnected
// 	};
// }