import { Col, Row } from "react-bootstrap"
import storeData from "../data/items.json"
import StoreItem from "../components/StoreItem"

export default function Store() {
  return (
    <>
    <h1>
     Store
    </h1>
    <Row xs={1} md={2} lg={3} className="g-3">
    {storeData.map(item=> <Col><StoreItem {...item} key={item.id}/></Col>)}
    </Row>
    </>
  )
}
