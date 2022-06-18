import { useEffect, useState } from "react";
import axios from "axios";
import ClothesCard from "./clothescard";

export default function ListItem() {
  const [allClothes, setAllClothes] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost/api/clothes/read.php").then((res) => {
      setAllClothes(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearch(e);
    setClothes(allClothes.filter((items) => items.name.toLowerCase().includes(e.toLowerCase())));
  };


  return (
    <div className="bg-white title">
      <div className="newProduct__title">
        <div className="newProduct__title__left">
          <div className="header__logoText">PRODUCT</div>
        </div>

        <div className="newProduct__title__right desktop">
          

          <div
            className="newProduct__item hover_underline"
            onClick={() => {
              setType("");
            }}
          >
            All <div className="underline"></div>
          </div>
          <div
            className="newProduct__item hover_underline"
            onClick={() => {
              setType("Shoes");
            }}
          >
            Shoes <div className="underline"></div>
          </div>
          <div
            className="newProduct__item hover_underline"
            onClick={() => {
              setType("Clothes");
            }}
          >
            Clothes <div className="underline"></div>
          </div>
          <div
            className="newProduct__item hover_underline"
            onClick={() => {
              setType("Accessories");
            }}
          >
            Accessories <div className="underline"></div>
          </div>

          <div className="items__search">
            <input
              type="text"
              className="header__user__search__input"
              id="search"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <label htmlFor="search">
              <i className="fa-solid fa-magnifying-glass fa-2x header__user__item hover__input"></i>
            </label>
          </div>
        </div>
        <div className="newProduct__title__right mobile">
          <div className="items__search">
            <input
              type="text"
              className="header__user__search__input"
              id="search"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div
            className="input-group select"
            onChange={(e) => setType(e.target.value)}
          >
            <select className="custom-select" defaultValue="">
              <option value="">All</option>
              <option value="Shoes">Shoes</option>
              <option value="Clothes">Clothes</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>
      </div>
          
      {(search === ""? 
        <div className="newProduct__content">
          {(type === "" ? allClothes : allClothes.filter((it) => type === it.type)).map(
            (item, index) => {
              return (
                <ClothesCard item={item} index={index} />
              );
            }
          )}
        </div>
        :
          <div className="newProduct__content">
            {(type === "" ? clothes : clothes.filter((it) => type === it.type)).map(
              (item, index) => {
                return (
                  <ClothesCard item={item} index={index} />
                );
              }
            )}
          </div>   
      )}
    </div>
  );
}
