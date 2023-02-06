import Observable from '../framework/observable.js';
import { generatePoints } from '../mock/point.js';
import { offersByType } from '../mock/offer.js';
import { destinations } from '../mock/destination.js';

export default class DataModel extends Observable {
  #dataApiService = null;
  #points = generatePoints();
  #offers = offersByType;
  #destinations = destinations;

  constructor({dataApiService}) {
    super();
    this.#dataApiService = dataApiService;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  #adaptToClient (point) {
    const adaptedPoint = {
      ...point,
      basePrice: point.base_price,
      dateFrom: new Date (point.date_from),
      dateTo: new Date (point.date_to)
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  }

}