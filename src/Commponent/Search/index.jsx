import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
    <>
      <form>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search" />
        </InputGroup>
      </form>
    </>
  );
};

export default Search;
