<<<<<<< HEAD
//20190920 ver.1
//this is for extention library JR801
//maintained by jimirobot



//% weight=50 color=#4db8ff icon="\uf0ad" block="JR801-Motor"
namespace jr801ext {
=======
//20190919 ver.1
//this is for extention library JR801
//maintained by jimirobot

 //% weight=50 color=#4db8ff icon="\uf0ad" block="JR801-MOTOR"

 namespace jr801ext {
>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96

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
<<<<<<< HEAD
        Servo1 = 0, Servo2, Servo3, Servo4, Servo5, Servo6, Servo7, Servo8
    }
    export enum lednum {
        S1 = 0, S2, S3, S4, S5, S6, S7, S8
    }
    export enum dcmotors {
        M1 = 0, M2
    }
    export enum directions {
        Forward = 0, Backward
=======
        servo1 = 0, servo2, servo3, servo4, servo5, servo6, servo7, servo8
    }
    export enum dcmotors {
        m1 = 0, m2
    }
    export enum directions {
        forward = 0, backward
>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96
    }
    let pca9685init_f = false


    function writeI2c9685(i2cAddress: number, register: number, value: number) {
        const buffer = pins.createBuffer(2)
        buffer[0] = register
        buffer[1] = value
        pins.i2cWriteBuffer(i2cAddress, buffer, false)
    }


    /*This function is for initialing the pca9685 in jr801  */
<<<<<<< HEAD
    //% block="Initial PCA9685" blockId="initialPca9685" 
    //% blockGap=2 weight=90 blockExternalInputs=true
    export function initialPca9685(): void {
=======
    // % blockId="initialPca9685" block="Initial PCA9685"
    // % blockGap=2 weight=10 
    export function initialPca9685():void {
>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96
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

<<<<<<< HEAD
    /* this function is to set led duty cycle 0-100 and the period is 20ms */
    //% blockId="setLedDutyCycle" block="Set LED Duty Cycle %led| Duty %duty" 
    //% blockGap=2 weight=80 
    //% duty.min=0 duty.max=100 duty.defl=10
    export function setLedDutyCycle(led: lednum, duty: number) {
        let duty_value = 0
        let led_offset = 0
        let led_duty_offset_h = 0
        let led_duty_offset_l = 0

        //check the range of parameters   
        if (duty > 100) duty = 100
        if (duty < 0) duty = 0
        if (led < 0) led = 0
        if (led > 7) led = 7

        //check if the pca9685 is initialed
        if (pca9685init_f == false)
            initialPca9685()
        duty_value = Math.floor(duty * 40.95)
        led_offset = led * 4
        led_duty_offset_h = (duty_value >> 8) & (0xFF)
        led_duty_offset_l = (duty_value) & (0xFF)
        //write to setting value to pca9685 REG
        if ((duty >= 0) && (duty < 100)) {
            writeI2c9685(CHIP_ADDRESS, REG_LED8_ON_L + led_offset, 0x00)
            writeI2c9685(CHIP_ADDRESS, REG_LED8_ON_H + led_offset, 0x00)
            writeI2c9685(CHIP_ADDRESS, REG_LED8_OFF_L + led_offset, led_duty_offset_l)
            writeI2c9685(CHIP_ADDRESS, REG_LED8_OFF_H + led_offset, led_duty_offset_h)
        }
        //duty==100 full on
        else {
            writeI2c9685(CHIP_ADDRESS, REG_LED8_ON_L + led_offset, 0x00)
            writeI2c9685(CHIP_ADDRESS, REG_LED8_ON_H + led_offset, 0x10)
        }
    }



    /*  this function is to set the servo degree(0-180) application,eg:sg90 1ms-2ms,default=50hz)*/
    //% blockId="setServoPos" block="Set Servo %servo|Degree %servo_degree" 
    //% blockGap=2 weight=70 blockExternalInputs=true 
    export function setServoPos(servo: servonum, servo_degree: number) {
=======
/*  this function is to set the servo degree(0-180) application,eg:sg90 1ms-2ms,default=50hz)*/
    //%blockId="setServoPos" block="Set Servo %servo|Degree %servo_degree" 
    //% blockGap=2 weight=20  
   
    export function setServoPos(servo: servonum, servo_degree: number):void {
>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96
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


    /*  this function is to set dc motor speed including m1/m2,forward/reserve,speed[0-4095]*/
<<<<<<< HEAD
    //% blockId="dcmotorSpeedControl" block="Set DC Motor %dcnum|Direction%dir|Speed%speed" 
    //% blockGap=2 weight=60 
    //% speed.min=0 speed.max=4095 speed.defl=0

    export function dcmotorSpeedControl(dcnum: dcmotors, dir: directions, speed: number) {

        let dc_speed_h = 0
        let dc_speed_l = 0;
        //chech the range of parameters
        if (speed > 4095) speed = 4095
        if (speed < 0) speed = 0
        if (dcnum < 0) dcnum = 0
        if (dcnum > 1) dcnum = 1
        if (dir < 0) dir = 0
        if (dir > 1) dir = 1
        //check if the pca9685 is initialed
=======
    //% blockId="dcmotorSpeedControl" block="Set DC Motor %dcnum | Direction %dir | Speed %speed" 
    //% blockGap=2 weight=30  
 
    export function dcmotorSpeedControl(dcnum: dcmotors, dir: directions, speed: number):void {

        let dc_speed_h = 0
        let dc_speed_l = 0;
        //check if the pca9685 is initialed
        if (speed > 4095)
            speed = 4095
        if (speed < 0)
            speed = 0
>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96
        if (pca9685init_f == false)
            initialPca9685()
        dc_speed_h = (speed >> 8) & (0xFF)
        dc_speed_l = (speed) & (0xFF)

        if (dcnum == 0) {				//m1
            if (dir == 0) {				//forward
                writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_L, dc_speed_l)
                writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_H, dc_speed_h)
                writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_H, 0x00)
            }
            else {					//reserve
                writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_L, dc_speed_l)
                writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_H, dc_speed_h)
            }
        }
        else {						//m2
            if (dir == 0) {				//forward
                writeI2c9685(CHIP_ADDRESS, REG_LED2_ON_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED2_ON_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED2_OFF_L, dc_speed_l)
                writeI2c9685(CHIP_ADDRESS, REG_LED2_OFF_H, dc_speed_h)
                writeI2c9685(CHIP_ADDRESS, REG_LED3_ON_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED3_ON_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED3_OFF_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED3_OFF_H, 0x00)
            }
            else {					//reserve
                writeI2c9685(CHIP_ADDRESS, REG_LED2_ON_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED2_ON_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED2_OFF_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED2_OFF_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED3_ON_L, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED3_ON_H, 0x00)
                writeI2c9685(CHIP_ADDRESS, REG_LED3_OFF_L, dc_speed_l)
                writeI2c9685(CHIP_ADDRESS, REG_LED3_OFF_H, dc_speed_h)
            }
        }
    }

    /*  this function is to set dc motor stop including m1/m2*/
<<<<<<< HEAD
    //% blockId="dcmotorStop" block="Stop DC Motor%dcnum " 
    //% blockGap=2 weight=50  

    export function dcmotorStop(dcnum: dcmotors) {
=======
    //% blockId="dcmotorStop" block="Stop DC Motor %dcnum " 
    //% blockGap=2 weight=40  

    export function dcmotorStop(dcnum: dcmotors):void {
>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96
        if (dcnum > 1 || dcnum < 0)
            return
        if (pca9685init_f == false)
            initialPca9685()
        writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_L + 8 * dcnum, 0x00)
        writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_H + 8 * dcnum, 0x00)
        writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_L + 8 * dcnum, 0x00)
        writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_H + 8 * dcnum, 0x00)
        writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_L + 8 * dcnum, 0x00)
        writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_H + 8 * dcnum, 0x00)
        writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_L + 8 * dcnum, 0x00)
        writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_H + 8 * dcnum, 0x00)

    }
    /*  this function is to set all dc motor stop */
    //% blockId="dcmotorStopAll" block="Stop All DC Motor " 
<<<<<<< HEAD
    //% blockGap=2 weight=40  
    export function dcmotorStopAll() {
=======
    //% blockGap=2 weight=50  
    export function dcmotorStopAll():void {
>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96
        dcmotorStop(0)
        dcmotorStop(1)
    }


    /*  this function is to set stepper motor angle including forward/reserve,angle*/
<<<<<<< HEAD
    //% blockId="stepControlAngle42" block="Set Stepper Motor Angle%angle|Direction%dir" 
    //% blockGap=2 weight=30 
    //% angle.min=0 angle.max=720 angle.defl=0

    export function stepControlAngle42(angle: number, dir: directions) {

        let step_num = Math.abs(Math.floor(angle / 1.8))   //stepper42 1.8 degree/1 stop
        //check the range of parameters

        if (dir < 0) dir = 0
        if (dir > 1) dir = 1

        //check if the pca9685 is initialed
        if (pca9685init_f == false)
            initialPca9685()
        if (step_num == 0) return
=======
    //% blockId="stepControlAngle42" block="Set Stepper Motor Direction %dir| Angle %angle" 
    //% blockGap=2 weight=60  
    export function stepControlAngle42(dir: directions, angle: number) :void{

        let step_num = Math.floor(angle / 1.8)   //stepper42 1.8 degree/1 stop
        //check if the pca9685 is initialed
        if (pca9685init_f == false)
            initialPca9685()

        if (step_num == 0) {
            return
        }
>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96
        if (dir == 0) {       //forward
            writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_H, 0x0b)
            writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_H, 0x03)
            writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_H, 0x03)
            writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_H, 0x0b)
            writeI2c9685(CHIP_ADDRESS, REG_LED2_ON_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED2_ON_H, 0x07)
            writeI2c9685(CHIP_ADDRESS, REG_LED2_OFF_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED2_OFF_H, 0x0f)
            writeI2c9685(CHIP_ADDRESS, REG_LED3_ON_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED3_ON_H, 0x0f)
            writeI2c9685(CHIP_ADDRESS, REG_LED3_OFF_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED3_OFF_H, 0x07)
<<<<<<< HEAD
=======

>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96
        }
        else {    //reserve
            writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED0_ON_H, 0x0b)
            writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED0_OFF_H, 0x03)
            writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED1_ON_H, 0x03)
            writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED1_OFF_H, 0x0b)
            writeI2c9685(CHIP_ADDRESS, REG_LED2_ON_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED2_ON_H, 0x0f)
            writeI2c9685(CHIP_ADDRESS, REG_LED2_OFF_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED2_OFF_H, 0x07)
            writeI2c9685(CHIP_ADDRESS, REG_LED3_ON_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED3_ON_H, 0x07)
            writeI2c9685(CHIP_ADDRESS, REG_LED3_OFF_L, 0xff)
            writeI2c9685(CHIP_ADDRESS, REG_LED3_OFF_H, 0x0f)
        }
        basic.pause(5 * step_num)   //waiting time = (20ms/4) * stepnum
        dcmotorStop(1)				//stop
        dcmotorStop(0)

    }
    /*  this function is to set stepper motor turns including forward/reserve,turns*/
<<<<<<< HEAD
    //% blockId="stepControlTurn42" block="Set Stepper Motor Turns%turn|Direction%dir " 
    //% blockGap=2 weight=20  
    //% turn.min=0 turn.max=720 turn.defl=0
    export function stepControlTurn42(turn: number, dir: directions) {
        let all_degree = 360 * turn   //stepper42 1.8 degree/1 step
        if (dir < 0) dir = 0
        if (dir > 1) dir = 1
        stepControlAngle42(all_degree, dir)
    }

}





=======
    //% blockId="stepControlTurn42" block="Set Stepper Motor Direction %dir|Turns %turn " 
    //% blockGap=2 weight=70  

    export function stepControlTurn42(dir: directions, turn: number):void {
        let all_degree = 360 * turn   //stepper42 1.8 degree/1 step
        stepControlAngle42(dir, all_degree)
    }
}

>>>>>>> 0d9ee29fe1e4bec2d456a34abc15ef1c1fc8cb96
