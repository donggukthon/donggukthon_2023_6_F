import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import * as S from './style';
import Node from '@/components/Node/Node';
import { useNavigate } from 'react-router-dom';

export default function ReportStatus() {
    const NodeList = [<Node />, <Node/>];

    return (
      <PageLayoutGreen title={"제보현황"}>
        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
          {NodeList.map((item, index) => 
            <li key={index} style={{marginBottom: '10px'}}>{item}</li>)}
        </ul>
      </PageLayoutGreen>
    );
}
