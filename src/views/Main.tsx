import styled from "styled-components";
import data from "../../data.json";
import Card from "../components/Card";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  @media (max-width: 768px) {
    & {
      grid-template-columns: 1fr;
    }
  }
`;

interface Goods {
  id: number;
  name: string;
  price: number;
  img: string;
  alt: string;
}

const PAGE_SIZE = 10;

function generateUniqueId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

const Main = () => {
  const [loadedGoods, setLoadedGoods] = useState<Goods[]>([]);
  const [page, setPage] = useState(1);

  const fetchGoods = (page: number) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;

    const newGoods: Goods[] = data.slice(startIndex, endIndex);

    setLoadedGoods((prevGoods: Goods[]) => [...prevGoods, ...newGoods]);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchGoods(1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      fetchGoods(page);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div className="container">
      <Wrapper>
        {loadedGoods.map((good) => (
          <Card key={generateUniqueId()} good={good}></Card>
        ))}
      </Wrapper>
    </div>
  );
};

export default Main;
