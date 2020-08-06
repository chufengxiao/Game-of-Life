import cv2
import matplotlib.pyplot as plt

img = cv2.imread("./spaceship.png")
img_flip = cv2.flip(img,0)
img_flip = cv2.flip(img_flip,1)
cv2.imwrite("../spaceship.png",img_flip)
# plt.imshow(img_flip)
# plt.show()