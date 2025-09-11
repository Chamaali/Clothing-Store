import storyOne from '../../assets/story/story1.jpg'
import storyTwo from '../../assets/story/story2.jpg'
import storyThree from '../../assets/story/story3.jpg'
import storyFour from '../../assets/story/story4.jpg'
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiHeadphones } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";

export const storyData = [
    {
        image: storyOne,
        icon: LiaShippingFastSolid,
        hedingText:'Free Shipping',
        descText:'Free shipping for order above $150'
    },
    {
        image: storyTwo,
        icon: RiMoneyDollarCircleLine,
        hedingText:'Money Guarantee',
        descText:'Withing 30 days for an exchange'
    },
    {
        image: storyThree,
        icon: FiHeadphones,
        hedingText:'Online Support',
        descText:'24 hours a day, 7 days a week'
    },
    {
        image: storyFour,
        icon:MdOutlinePayment,
        hedingText:'Flexible Payment',
        descText:'Pay with multiple credit cards'
    },
]