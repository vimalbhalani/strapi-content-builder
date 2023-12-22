// @ts-nocheck
import {
  Box,
  Flex,
  SingleSelect,
  SingleSelectOption,
  Stack,
} from "@strapi/design-system";
import React, { useEffect, useState } from "react";
import { auth, useFetchClient } from "@strapi/helper-plugin";
import qs from "qs";

export default function Index({
  name,
  error,
  description,
  onChange,
  value,
  intlLabel,
  attribute,
}) {
  const fetch = useFetchClient();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        // const response = await fetch(`/collection-selector`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${auth.get("jwtToken")}`
        //   }
        // });
        const query = qs.stringify(
          {
            filters: {
              schema: {
                $and: [
                  {
                    kind: {
                      $eq: "collectionType",
                    },
                  },
                ],
              },
            },
          },
          {
            encodeValuesOnly: true,
          }
        );
        const response = await fetch.get(
          `content-type-builder/content-types?${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.get("jwtToken")}`,
            },
          }
        );

        if (response.statusText !== "OK") {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = response.data.data.filter(
          (collection) =>
            collection.schema.visible && collection.uid.includes("api")
        );
        const mappedCollections = result.map(({ schema, ...rest }) => ({
          ...rest,
          ...schema,
        }));
        setCollections(mappedCollections);
        console.log("result test", mappedCollections);
      } catch (err) {
        console.log(err.message);
      }
    };

    loadCollections();
  }, []);

  const handleCollectionChange = (event) => {
    console.log("event", event);
    // onChange
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={4}>
      <SingleSelect
        onChange={handleCollectionChange}
        label="Collection"
        required
        placeholder="Select collection"
        hint="Collection to query data from"
        error={error}
      >
        {collections.map((collectionObj) => (
          <SingleSelectOption
            key={collectionObj.uid}
            value={collectionObj.collectionName}
          >
            {collectionObj.displayName}
          </SingleSelectOption>
        ))}
      </SingleSelect>
      <Stack horizontal>
        <Flex direction="row" alignItems="stretch" gap={3}>
          <Box color="neutral800" background="primary100" padding={4}>
            First
          </Box>
          <Box color="neutral800" background="primary100" padding={4}>
            Second
          </Box>
          <Box color="neutral800" background="primary100" padding={4}>
            Third
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
}
