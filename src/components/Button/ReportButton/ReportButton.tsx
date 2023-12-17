import {ButtonProps} from '@/interfaces/button';
import BlackButtonImg from '@/assets/Button/BlackButton.svg';
import Button from '../Button';

type LongButtonProps = Partial<ButtonProps>;

export default function LongButton(props: LongButtonProps) {
  return (
    <Button width={200} height={60} background={BlackButtonImg} {...props}>
      {props.children}
    </Button>
  );
}
