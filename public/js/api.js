const url = "http://localhost:3001/";

const getter = {
  async metadata() {
    const response = await fetch(url + "metadata");
    const { title } = response.data.properties;
    console.log(title);
  },
};

