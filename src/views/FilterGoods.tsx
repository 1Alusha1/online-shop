import { ChangeEvent, FC } from "react";
import { Dispatch, SetStateAction } from "react";
import { Goods } from "../components/Card";
import styled from "styled-components";
import { Select } from "./Form";

interface IFilterGoods {
  goods: Goods[];
  setGoods: Dispatch<SetStateAction<Goods[]>>;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;

  select{
    width: 90px;
  }
`;

const FillterGoods: FC<IFilterGoods> = ({ goods, setGoods }) => {
  const min = () => {
    goods.sort((a: any, b: any) => a.price - b.price);
    setGoods((prev) => [...prev]);
  };

  const max = () => {
    goods.sort((a: any, b: any) => b.price - a.price);
    setGoods((prev) => [...prev]);
  };

  const rateMax = () => {
    goods.sort((a: any, b: any) => b.rating - a.rating);
    setGoods((prev) => [...prev]);
  };
  const rateMin = () => {
    goods.sort((a: any, b: any) => a.rating - b.rating);
    setGoods((prev) => [...prev]);
  };

  const sortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);

    switch (e.target.value) {
      case "minPrice":
        return min();
      case "maxPrice":
        return max();
      case "minRating":
        return rateMin();
      case "maxRating":
        return rateMax();
    }
  };
  return (
    <>
      <Wrapper>
        <Select onChange={(e: ChangeEvent<HTMLSelectElement>) => sortBy(e)}>
          <option value="minPrice" onChange={min}>
            min price
          </option>
          <option value="maxPrice" onChange={max}>
            max price
          </option>
          <option value="minRating" onClick={rateMin}>
            min rating
          </option>
          <option value="maxRating" onClick={rateMax}>
            max rating
          </option>
        </Select>
      </Wrapper>
    </>
  );
};

export default FillterGoods;
