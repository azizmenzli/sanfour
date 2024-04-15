import React from 'react'
import { Card } from 'antd'
function CardSheet({ cardData = [] }) { // Default to an empty array if no data is passed
    console.log(cardData);
    return (
      <div className="flex flex-wrap justify-center gap-4 m-4">
        {cardData?.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            bordered={false}
            className="w-full  p-4"
            style={{ maxWidth: "300px" }}
          >
           <p> commandId: {item.commandId}</p>
           <p>  articleName: {item.articleName}</p>
          <p>telephoneVendeur: {item. command.telephoneVendeur}</p>
          <p>telephoneClient: {item. command.telephoneClient}</p>
          <p>adresseClient: {item. command.adresseClient}</p>
          <p>villeClient: {item. command.villeClient}</p>
          <p>Total Colis: {item.totalParcels}</p>
          </Card>
        ))}
      </div>
    );
  }
export default CardSheet