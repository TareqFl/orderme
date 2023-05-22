class CartHandler {
  constructor(all_items, item, captured_item, index) {
    this.all_items = all_items;
    this.item = item;
    this.captured_item = captured_item;
    this.index = index;
  }

  execute() {
    if (this.all_items.length === 0) {
      this.item.quantity = 1;
      this.all_items.push(this.item);
      return this.all_items;
    }
    let fact = this.all_items.includes(this.captured_item);
    if (fact) {
      this.captured_item.quantity = this.item.quantity + 1;
      return this.all_items;
    }
    this.item.quantity = +1;
    this.all_items.push(this.item);
    return this.all_items;
  }
}

export default CartHandler;
