export class Register {
    name: string;
    offset: number;
    readonly regSize: 1|2;

    dataview: DataView;

    constructor(name: string, offset: number, data: ArrayBuffer, regSize : 1|2 = 1){
        this.name = name;
        this.offset = offset;
        this.dataview = new DataView(data);
        this.regSize = regSize;
    }

    get value() {
        if(this.regSize === 1){
            return this.dataview.getUint8(this.offset);
        } else {
            return this.dataview.getUint16(this.offset, true); //use little endian for 16 bit fetches
        }
    }

    set value(v: number) {
        if(this.regSize === 1){
            console.log("setting to register " + this.name + " with value " + v)
            this.dataview.setUint8(this.offset, v);
        } else {
            this.dataview.setUint16(this.offset, v, true); //use little endian 
        }
    }
}

export class FlagRegister extends Register{
    get Z() {
        return (this.value >> 7);
    }

    set Z(v: number) {
        if(v === 1){
            this.value = this.value | (1 << 7);
        } else {
            this.value = this.value & ~(1 << 7);
        }
    }

    get N() {
        return ((this.value >> 6) & 1);
    }

    set N(v: number) {
        if(v === 1){
            this.value = this.value | (1 << 6);
        } else {
            this.value = this.value & ~(1 << 6);
        }
    }

    get H() {
        return ((this.value >> 5) & 1);
    }

    set H(v: number) {
        if(v === 1){
            this.value = this.value | (1 << 5);
        } else {
            this.value = this.value & ~(1 << 5);
        }
    }

    get C() {
        return ((this.value >> 4) & 1);
    }

    set C(v: number) {
        if(v === 1){
            this.value = this.value | (1 << 4);
        } else {
            this.value = this.value & ~(1 << 4);
        }
    }
}

export class ExtendedFlagRegister extends Register{
    set value(v: number) {
        const mask = 0b1111111111110000; // lower 4 bits are never used, so do not set them.
        this.dataview.setUint16(this.offset, mask & v, true);
    }
}