const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			msg:"",
			token:"",
			user:null,
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			dehydrate: () => {
				sessionStorage.setItem("store", JSON.stringify(getStore()));
			  },
		
			  rehydrate: () => {
				setStore(JSON.parse(sessionStorage.getItem("store")));
			},

			login: async (username, password) => {
				const options = {
				  headers: {
					"Content-Type": "application/json",
				  },
				  method: "POST",
				  body: JSON.stringify({ username: username, password: password }),
				};
				const resp = await fetch(
				  `${process.env.BACKEND_URL}/api/login`,
				  options
				);
				const data = await resp.json();
				setStore(data);
				getActions().dehydrate();
			  },

			  log_out: () => {
				setStore({
				  token: "",
				  msg: "",
				  user: null,
				});
				getActions().dehydrate();
			  },
		
			  sign_up: async (username, password) => {
				const options = {
				  headers: {
					"Content-Type": "application/json",
				  },
				  method: "POST",
				  body: JSON.stringify({
					username: username,
					password: password,
				  }),
				};
				const resp = await fetch(
				  `${process.env.BACKEND_URL}/api/signup`,
				  options
				);
				const data = await resp.json();
				return setStore(data);
			  },
		}
	};
};

export default getState;
