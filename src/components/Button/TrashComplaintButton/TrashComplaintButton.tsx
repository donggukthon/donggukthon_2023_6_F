import {ButtonProps} from '@/interfaces/button';
import TrashComplaintButtonImg from '@/assets/Button/TrashComplaintButton.png';
import Button from '../Button';

type TrashComplaintButtonProps = Partial<ButtonProps>;

export default function TrashComplaintButton(props: TrashComplaintButtonProps) {
  return (
    <Button 
    width={120} 
    height={40} 
    background={TrashComplaintButtonImg} 
    position={'absolute'}
    {...props}>
      {props.children}
    </Button>
  );
}
