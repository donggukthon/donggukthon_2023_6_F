import {ButtonProps} from '@/interfaces/button';
import SmallButtonImg from '@/assets/Button/SmallButton.svg';
import Button from '../Button';

type SmallButtonProps = Partial<ButtonProps>;

export default function SmallButton(props: SmallButtonProps) {
  return (
    <Button 
    width={111} 
    height={49.5} 
    background={SmallButtonImg} 
    {...props}>
      {props.children}
    </Button>
  );
}
