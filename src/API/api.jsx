export default class Api {
  baseUrl = 'https://aviasales-test-api.kata.academy';

  async getSearchId() {
    const response = await fetch(`${this.baseUrl}/search`);
    if (!response.ok) {
      throw new Error('Error fetching Search ID');
    }
    const data = await response.json();
    return data.searchId;
  }

  async getTickets(searchId) {
    const response = await fetch(
      `${this.baseUrl}/tickets?searchId=${searchId}`
    );
    if (response.status === 500) {
      return this.getTickets(searchId);
    }
    if (!response.ok) {
      throw new Error('Error fetching tickets');
    }
    const data = await response.json();
    return data;
  }
}
