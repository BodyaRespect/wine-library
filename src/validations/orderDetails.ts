import { z } from 'zod'

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const orderDetailsSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
  city: z.string().min(4),
  shippingAddress: z.string().min(3),
  deliveryType: z.string().min(5),
  paymentType: z.string().min(1),
})

export type OrderDetails = z.infer<typeof orderDetailsSchema>
