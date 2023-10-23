import './statsPage.scss';
import { useEffect, useState } from "react";
import moment from "moment";
import OrderApi from '../../../utils/apis/OrderApi';
import { Order } from '../../../utils/models/Order';
import { groupBy } from 'lodash';

const StatsPage = () => {

    const [ orders, setOrders ] = useState<Array<any>>();

    useEffect(() => {

        OrderApi.getAllOrders().then((orders:Array<Order>) => {
            const groupedOrdersByDateAndId = groupBy(orders, (order) => `${order.courseDate.date}_${order.rawProducts.productId}`);
            setOrders(Object.entries(groupedOrdersByDateAndId))
           
        });

    }, [])


    return(
        <div className="datesWrapper">
           { orders?.map(([groupPath, groupedOrders]: [ groupPath:string, groupedOrders: Array<Order> ], groupIndex) => {
                const date = moment(groupPath.split('_')?.[0]).format('hh:mm DD-MM-yyyy');
                const courseName = groupedOrders?.[0].rawProducts.productTitle;
                return (
                    <div className='datesWrapper-card' key={groupIndex}>
                        <p className='datesWrapper-card-courseName'>{courseName}</p>
                        <p className='datesWrapper-card-date'>{ date }</p>
                        {/* <p className='datesWrapper-card-header'>Kupili: </p> */}
                        { groupedOrders.map((order:Order, index: number) => {
                            return (
                                <div className='datesWrapper-card-client' key={index}>
                                    <div>{index + 1}. {order.email}</div>
                                </div>
                            )
                        }) }
                    </div>
                )
              
           }) }
        </div>
    )
}

export default StatsPage;