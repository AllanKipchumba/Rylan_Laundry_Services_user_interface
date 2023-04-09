import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientState {
  _id: string;
  count: number;
  totalAmount: number;
}

interface FilterState {
  clients: ClientState[];
}

interface FilterPayload {
  ourClients: ClientState[];
  search: string;
}

const initialState: FilterState = {
  clients: [],
};

const filterOurClients = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action: PayloadAction<FilterPayload>) => {
      const { ourClients, search } = action.payload;
      const searchedClient = ourClients.filter((client: ClientState) =>
        client._id?.toLowerCase().includes(search.toLowerCase())
      );
      state.clients = searchedClient;
    },
  },
});

export const { FILTER_BY_SEARCH } = filterOurClients.actions;

export default filterOurClients.reducer;
