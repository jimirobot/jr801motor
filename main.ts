//20190919 ver.1
//this is for extention library JR801
//maintained by jimirobot

 //% weight=50 color=#4db8ff icon="\uf0ad" block="JR801-MOTOR"

 namespace jr801ext {

    const REG_MODE1 = 0
    const CHIP_ADDRESS = 65
    const REG_PRESCALE = 254
    const REG_ALL_LED_ON_L = 250
    const REG_ALL_LED_ON_H = 251
    const REG_ALL_LED_OFF_L = 252
    const REG_ALL_LED_OFF_H = 253
    const REG_LED8_ON_L = 38
    const REG_LED8_ON_H = 39
    const REG_LED8_OFF_L = 40
    const REG_LED8_OFF_H = 41
    const REG_LED0_ON_L = 6
    const REG_LED0_ON_H = 7
    const REG_LED0_OFF_L = 8
    const REG_LED0_OFF_H = 9
    const REG_LED1_ON_L = 10
    const REG_LED1_ON_H = 11
    const REG_LED1_OFF_L = 12
    const REG_LED1_OFF_H = 13
    const REG_LED2_ON_L = 14
    const REG_LED2_ON_H = 15
    const REG_LED2_OFF_L = 16
    const REG_LED2_OFF_H = 17
    const REG_LED3_ON_L = 18
    const REG_LED3_ON_H = 19
    const REG_LED3_OFF_L = 20
    const REG_LED3_OFF_H = 21

    const FREQ_SET = 121
    const SERVO_POS_START = 205
    const REG_MODE2 = 1
    export enum servonum {
        servo1 = 0, servo2, servo3, servo4, servo5, servo6, servo7, servo8
    }
    export enum dcmotors {
        m1 = 0, m2
    }
    export enum directions {
        forward = 0, backward
    }
    let pca9685init_f = false


    function writeI2c9685(i2cAddress: number, register: number, value: number) {
        const buffer = pins.createBuffer(2)
        buffer[0] = register
        buffer[1] = value
        pins.i2cWriteBuffer(i2cAddress, buffer, false)
    }


    /*This function is for initialing the pca9685 in jr801  */
    // % blockId="initialPca9685" block="Initial PCA9685"
    // % blockGap=2 weight=10 
    export function initialPca9685():void {
        let regvalue
        // read the mode1 register value and set to sleep mode
        regvalue = (0x01) | (0x10)
        writeI2c9685(CHIP_ADDRESS, REG_MODE1, 17)
        // set the freq=50
        writeI2c9685(CHIP_ADDRESS, REG_PRESCALE, 121)
        // set the all-led on and off 0x00
        writeI2c9685(CHIP_ADDRESS, REG_ALL_LED_ON_L, 0)
        writeI2c9685(CHIP_ADDRESS, REG_ALL_LED_ON_H, 0)
        writeI2c9685(CHIP_ADDRESS, REG_ALL_LED_OFF_L, 0)
        writeI2c9685(CHIP_ADDRESS, REG_ALL_LED_OFF_H, 0)
        // set to normal mode
        regvalue = (0x01) & (0xEF)
        writeI2c9685(CHIP_ADDRESS, REG_MODE1, 1)
        // wait for stable osc at least 500us
        control.waitMicros(1000)
        // set the restart in the REG_MODE1
        regvalue = ((0x01) & (0xEF)) | (0x80)
        writeI2c9685(CHIP_ADDRESS, REG_MODE1, 129)
        // set the pca9685 init flag= true
        pca9685init_f = true
    }

/*  this function is to set the servo degree(0-180) application,eg:sg90 1ms-2ms,default=50hz)*/
    //%blockId="setServoPos" block="Set Servo %servo|Degree %servo_degree" 
    //% blockGap=2 weight=20  
   
    export function setServoPos(servo: servonum, servo_degree: number):void {
        let servo_offset = 0
        let servo_degree_offset = 0
        let servo_degree_off_l = 0
        let servo_degree_off_h = 0
        //check the limit of servo and serov_degree
        if (servo < 0) servo = 0
        if (servo > 7) servo = 7
        if (servo_degree < 0) servo_degree = 0
        if (servo_degree > 180) servo_degree = 180
        //check if the pca9685 is initialed
        if (pca9685init_f == false)
            initialPca9685()
        //cal the servo offset value
        servo_offset = servo * 4
        servo_degree_offset = 205 + Math.floor(servo_degree * 1.13)
        servo_degree_off_h = (servo_degree_offset >> 8) & (0xFF)
        servo_degree_off_l = (servo_degree_offset) & (0xFF)
        //write to setting value to pca9685 REG
        writeI2c9685(CHIP_ADDRESS, REG_LED8_ON_L + servo_offset, 0x00)
        writeI2c9685(CHIP_ADDRESS, REG_LED8_ON_H + servo_offset, 0x00)
        writeI2c9685(CHIP_ADDRESS, REG_LED8_OFF_L + servo_offset, servo_degree_off_l)
        writeI2c9685(CHIP_ADDRESS, REG_LED8_OFF_H + servo_offset, servo_degree_off_h)
    }
}

