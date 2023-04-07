import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useGetFoodTypeTags } from "../../../../../../services/queries/use-food-type-tags";
import queryClient from "../../../../../../configs/react-query.config";
import useUpdateSuperMarketFoodOption from "../../../../../../services/mutation/food-and-dining/supermarket/update/food/use-update-supermarket";
import useUpdateFoodServiceFoodOption from "../../../../../../services/mutation/food-and-dining/food-service/update/food/use-update-food-service";

const { Title } = Typography;
const { Option } = Select;



export const FoodServiceFoodType = ({food}:any) => {

    const {id} = useParams();
    const  [foodTypeList, setfoodTypeList] = useState([]);
    const getFoodTypeTags = useGetFoodTypeTags();
    const { mutate, isLoading } = useUpdateFoodServiceFoodOption(id);
    const foodTypes = [] as any

    useEffect(()=>{
        food.map((item:any)=>{
            foodTypes.push(item.id)
        })

    },[food]);

    const handleSubmit = () => {
        mutate(
            { food_type: foodTypeList},
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(`detail-food-service${id}`);
                    toast.success("Food type updated successfully");
                },
                onError: () => {
                    toast.error("Something went wrong. Please try again");
                },
            }
        );
    };

    return (
            <>
<Row style={{ width: "100%", marginBottom: 40 }}>
                <Row style={{ width: "100%", marginBottom: 10 }}>
                <Title level={4}>Food types</Title>
                </Row>
                <Col span={24}>
                    <FormItem>
                    <Select
                            onChange={(value) => {
                                setfoodTypeList(value)
                            }}
                            defaultValue = {foodTypes}
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                >
                        {getFoodTypeTags.data && (getFoodTypeTags.data.results).map((item:any)=>
                                <Option value={item.id} label={item.name}>
                                    <div className="demo-option-label-item">
                                        {item.name}
                                    </div>
                              </Option>
                            )}
                </Select>
                    </FormItem>
                    
                </Col>
            </Row>
            
            <Row justify="end" style={{ marginTop: 40 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleSubmit}
                    disabled = {!(foodTypeList.length > 0)}
                    style={{ width: 120, fontSize: 18 }}
                >
                    Save
                </Button>
            </Row>
            </>
    )
}