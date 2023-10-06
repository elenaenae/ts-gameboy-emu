
export class Memory {
    memArray : ArrayBuffer;
    memView : DataView;

    constructor() {
        this.memArray = new ArrayBuffer(0x10000);
        this.memView = new DataView(this.memArray);
    }

    readByte(address: number) {
        return this.memView.getUint8(address);
    }

    writeByte(address: number, value: number) {
        this.memView.setUint8(address, value);
    }
}