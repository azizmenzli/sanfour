import { Timeline } from 'rsuite';
import { FcInTransit, FcSynchronize,FcShop  } from "react-icons/fc";
import CheckIcon from '@rsuite/icons/legacy/Check';

const Steps = () => (
  <Timeline className="custom-timeline">
    <Timeline.Item dot={<FcSynchronize    />}>
      <p>March 1, 10:20</p>
      <p>Remis au transporteur</p>
      <p>Ville</p>
    </Timeline.Item>
    <Timeline.Item dot={<FcShop  />}>
      <p>March 1, 11:20</p>
      <p>Au dépôt</p>
      <p>Ville</p>
    </Timeline.Item>
    <Timeline.Item dot={<FcInTransit />}>
      <p>March 3, 14:20</p>
      <p>En cours de livraison</p>
      <p>vers Ville</p>
    </Timeline.Item>
    <Timeline.Item dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
      <p>March 3, 17:50</p>
      <p>Livré</p>
      <p>Ville</p>
    </Timeline.Item>
  </Timeline>
);

export default Steps;