class TokenHandler {
  constructor(local, session) {
    this.local = local;
    this.session = session;
  }

  async execute() {
    // Check session and local if null
    if (this.local === null && this.session === null) {
      return;
    }
    const response = await fetch("http://127.0.0.1:5000", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          this.local === null ? this.session : this.local
        }`,
      },
    });

    if (response.status !== 200) {
      this.status = { username: "", auth: false };
      return this.status;
    }

    const data = await response.json();
    const { username, auth } = data;
    this.status = {
      username,
      auth,
    };
    return this.status;
  }
}

export default TokenHandler;
