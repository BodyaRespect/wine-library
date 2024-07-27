import { z } from 'zod'

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const orderDetailsSchema = z.object({
  email: z.string().email('Input your email'),
  firstName: z.string().min(1, 'Input your first name'),
  lastName: z.string().min(1, 'Input your last name'),
  phoneNumber: z.string().regex(phoneRegex, 'Input your phone number'),
  city: z.string().min(4, 'Select your city'),
  shippingAddress: z.string().min(3, 'Enter the delivery address'),
  deliveryType: z.string().min(1, 'Select the delivery type'),
  paymentType: z.string().min(1, 'Filling in Payment is required'),
})

export type OrderDetails = z.infer<typeof orderDetailsSchema>
