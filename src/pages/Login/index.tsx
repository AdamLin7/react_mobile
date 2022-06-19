import {Button} from 'antd-mobile'
import Icon from '@/components/Icon'
export default function Login() {
  return (
    <div>
      <Button color='primary'>点击</Button>
     <Icon type='iconbtn_home_sel' onClick={() => {console.log('触发了！')}} className='my-icon'></Icon>
    </div>
  )
}
