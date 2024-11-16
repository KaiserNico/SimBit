from microbit import *
from neopixel import *
from random import randint

np = NeoPixel(pin0,10,bpp = 4)
for i in range(10):
    np[i] = (randint(0, 255), randint(0, 255), randint(0, 255), randint(0, 255))
np.show()

