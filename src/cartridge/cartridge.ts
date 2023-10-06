export class Cartridge {
    protected gameData: DataView;

    constructor(cartData: DataView) {
        this.gameData = cartData;
    }

    readByte(address: number){
        return this.gameData.getUint8(address);
    }

    writeByte(address: number){ //to be handled by the MBC implementations
        return;
    }

    get CGBFlag() {
        const flagData = this.gameData.getUint8(0x143);
        if(flagData >> 7 & 1){ //0x80 and 0xC0
            return true;
        } else {
            return false;
        }
    }

    get SGBFlag() {
        const flagData = this.gameData.getUint8(0x146);
        if(flagData === 0x03){
            return true;
        } else {
            return false;
        }
    }

    get ROMSize() {
        const sizeType = this.gameData.getUint8(0x148);
        switch(sizeType){
            case 0x00:
                return 0x008000; //32 KiB
            case 0x01:
                return 0x010000; //64 KiB
            case 0x02:
                return 0x020000; //128 KiB
            case 0x03:
                return 0x040000; //256 KiB
            case 0x04:
                return 0x080000; //512 KiB
            case 0x05:
                return 0x100000; //1 MiB
            case 0x06:
                return 0x200000; //2 MiB
            case 0x07:
                return 0x400000; //4 MiB
            case 0x08:
                return 0x800000; //8 MiB
            default:
                return 0x800000;
        }
    }

    get RAMSize() {
        const sizeType = this.gameData.getUint8(0x149);
        switch(sizeType){
            case 0x00:
            case 0x01:
                return 0; //no extended memory
            case 0x02:
                return 0x002000; //8 KiB
            case 0x03:
                return 0x008000; //32 KiB
            case 0x04:
                return 0x020000; //128 KiB
            case 0x05:
                return 0x010000; //64 KiB
            default:
                return 0x020000;
        }
    }
}