export default class ClosedRange {
  constructor(lowerEndpoint, upperEndpoint) {
    if (lowerEndpoint > upperEndpoint) {
      this.lowerEndpoint = null;
      this.upperEndpoint = null;
      return;
    }
    this.lowerEndpoint = lowerEndpoint;
    this.upperEndpoint = upperEndpoint;
  }

  getLowerEndpoint() {
    return this.lowerEndpoint;
  }

  getUpperEndpoint() {
    return this.upperEndpoint;
  }

  toString() {
    if (!this.lowerEndpoint || !this.upperEndpoint) {
      return null;
    }
    return `[${this.lowerEndpoint}, ${this.upperEndpoint}]`;
  }

  contains(num) {
    if (!this.lowerEndpoint || !this.upperEndpoint) {
      return false;
    }
    return this.lowerEndpoint <= num && num <= this.upperEndpoint;
  }
}
