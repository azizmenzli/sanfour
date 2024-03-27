import { Panel, Row, Col } from 'rsuite';

const CardNbrLiv = () => (
  <Row style={{display:'flex',margin:'10px'}}>
    <Col >
    <Panel bordered header="Livraisons à accepter" style={{borderColor:'black'}}>
    <text style={{fontSize:'40px',color:'#2e2c2c'}}>0</text>
  </Panel>
    </Col>
    <Col >
    <Panel bordered header="Colis au dépot" style={{borderColor:'black'}}>
    <text style={{fontSize:'40px',color:'green'}}>0</text>
  </Panel>
    </Col>
    <Col >
    <Panel bordered header="Livraisons effectuées" style={{borderColor:'black'}}>
    <text style={{fontSize:'40px'}}>0</text>
  </Panel>
    </Col>
    <Col >
    <Panel bordered header="Livraisons annulées" style={{borderColor:'black'}}>
    <text style={{fontSize:'40px'}}>0</text>
  </Panel>
    </Col>
  </Row>
);

export default CardNbrLiv;