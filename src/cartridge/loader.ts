import { Cartridge } from "./cartridge";

const CartTypeOffset = 0x147;

export class CartridgeLoader {
    

    loadGame(data: ArrayBuffer) {
        const cartDataView = new DataView(data);
        const cartType = cartDataView.getUint8(CartTypeOffset);

        switch(cartType) {
            case 0x00: //ROM ONLY
                return new Cartridge(cartDataView);
            case 0x01: //MBC1
            case 0x02: //MBC1+RAM
            case 0x03: //MBC1+RAM+BATTERY
                return new MBC1Cartridge(cartDataView);
            case 0x05: //MBC2
            case 0x06: //MBC2+BATTERY
                return new MBC2Cartridge(cartDataView);
            case 0x0B: //MMM01
            case 0x0C: //MMM01+RAM
            case 0x0D: //MMM01+RAM+BATTERY
                return new MMM01Cartridge(cartDataView);
            case 0x0F: //MBC3+TIMER+BATTERY
            case 0x10: //MBC3+TIMER+RAM+BATTERY 
            case 0x11: //MBC3
            case 0x12: //MBC3+RAM 
            case 0x13: //MBC3+RAM+BATTERY 
                return new MBC3Cartridge(cartDataView);
            case 0x19: //MBC5
            case 0x1A: //MBC5+RAM
            case 0x1B: //MBC5+RAM+BATTERY
            case 0x1C: //MBC5+RUMBLE
            case 0x1D: //MBC5+RUMBLE+RAM
            case 0x1E: //MBC5+RUMBLE+RAM+BATTERY
                return new MBC5Cartridge(cartDataView);
            case 0x20: //MBC6
                return new MBC6Cartridge(cartDataView);
            case 0x22: //MBC7+SENSOR+RUMBLE+RAM+BATTERY
                return new MBC7Cartridge(cartDataView);
            case 0xFC: //POCKET CAMERA
            case 0xFD: //BANDAI TAMA5
            case 0xFE: //HuC3
            case 0xFF: //HuC1+RAM+BATTERY

            default:
                console.log("invalid cart type")
                return new Cartridge(cartDataView);
        }
    }
}