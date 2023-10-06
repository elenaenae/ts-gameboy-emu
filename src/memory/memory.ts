
export class Memory {
    memArray : ArrayBuffer;
    memView : DataView;

    constructor() {
        this.memArray = new ArrayBuffer(0x10000); //0xFFFF address space
        this.memView = new DataView(this.memArray);
    }

    readByte(address: number) {
        //hand off reads in cartridge to cartridge
        
        return this.memView.getUint8(address);
    }

    writeByte(address: number, value: number) {
        //hand off writes in cartridge to cartridge

        this.memView.setUint8(address, value);
    }
}