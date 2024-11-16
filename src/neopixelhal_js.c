//Nico Kaiser

#include <stdio.h>
#include "neopixelhal.h"
#include "py/mphal.h"
#include "jshal.h"

void neopixel_hal_NeoPixel(int id,int pin, int n, int bytes_per_pixel, const uint8_t *buf) {
    mp_js_hal_NeoPixel(id,pin,n,bytes_per_pixel,buf);
}

void neopixel_hal_write(int id, int length, const uint8_t *buf) {
    mp_js_hal_write(id,length,buf);
}

