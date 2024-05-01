import leftArrow from '../../../assets/SVG/left-arrow.svg';
import useInput from '../../../hooks/useInput/use-input';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AddItem = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isAdd = searchParams.get('mode') === 'add';
  const itemId = searchParams.get('item-id');

  const ownerId = localStorage.getItem('id');

  ///////////////////////////////////////////////////////////////////////////////////////

  const {
    value: enteredName,
    hasError: nameHasError,
    reset: nameReset,
    isValueValid: isNameValid,
    blurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
  } = useInput((name) => name.trim() !== '');

  const {
    value: enteredPrice,
    hasError: priceHasError,
    reset: priceReset,
    isValueValid: isPriceValid,
    blurHandler: priceBlurHandler,
    valueChangeHandler: priceChangeHandler,
  } = useInput(
    (price) => price.trim() !== '' && price.match(/^[0-9]+$/) != null
  );

  const {
    value: enteredDesc,
    hasError: descHasError,
    reset: descReset,
    isValueValid: isDescValid,
    blurHandler: descBlurHandler,
    valueChangeHandler: descChangeHandler,
  } = useInput((desc) => desc.trim() !== '');

  const { value: enteredCategory, valueChangeHandler: categoryChangeHandler } =
    useInput((category) => category.trim() !== '');

  const { value: enteredType, valueChangeHandler: typeChangeHandler } =
    useInput((type) => type.trim() !== '');

  ///////////////////////////////////////////////////////////////////////////////////////

  const addItem = async (newItem) => {
    try {
      const response = await fetch('/api/v1/item/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(`error adding new item: ${data.message}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      window.alert(err.message);
      return null;
    }
  };

  const updateItem = async (newItem,itemId) => {
    try {
      const response = await fetch(`/api/v1/item/${itemId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('error adding new item!');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      window.alert(err.message);
      return null;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isNameValid && !isPriceValid & !isDescValid) {
      return;
    }
    const newItem = {
      name: enteredName,
      description: enteredDesc,
      price: +enteredPrice,
      category: enteredCategory,
      type: enteredType,
      availability: true,
      image: 'https://source.unsplash.com/1600x900/?' + enteredName
    };

    const response = isAdd ? await addItem(newItem) : await updateItem(newItem,itemId);

    if (response) {
      isAdd ? window.alert('item added successfully') : window.alert('item updated successfully');
    }

    nameReset();
    priceReset();
    descReset();
  };

  async function deleteHandler(itemId) {
    try {
      const response = await fetch(`/api/v1/item/${itemId}`, {
        method: 'delete',
      });
      if (!response.ok) {
        throw new Error('Error deleting item');
      }
      window.alert('item deleted');
    } catch (err) {
      window.alert(err);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="add-item">
      <div className="add-item__title" onClick={() => navigate('..')}>
        <div>
          <img src={leftArrow} alt='<' />
        </div>
        <h2 className="heading-secondary u-margin-left">
          {isAdd ? 'add new item' : 'edit item'}
        </h2>
      </div>
      {ownerId ? (
        <form className="add-item__form" onSubmit={onSubmitHandler}>
          <div className="add-item__form-group add-item__form-group--1">
            <label
              className="add-item__label heading-secondary u-margin-bottom"
              htmlFor="name"
            >
              Item name
            </label>
            <input
              className={nameHasError ? 'input--error' : 'input'}
              type="text"
              placeholder="enter item name"
              id="name"
              onBlur={nameBlurHandler}
              onChange={nameChangeHandler}
              value={enteredName}
            />
          </div>

          <div className="add-item__form-group add-item__form-group--2">
            <label
              className="add-item__label heading-secondary u-margin-bottom"
              htmlFor="price"
            >
              price
            </label>
            <input
              className={priceHasError ? 'input--error' : 'input'}
              type="text"
              placeholder="enter item price"
              id="price"
              value={enteredPrice}
              onChange={priceChangeHandler}
              onBlur={priceBlurHandler}
            />
          </div>

          <div className="add-item__form-group add-item__form-group--3">
            <label
              className="add-item__label heading-secondary u-margin-bottom"
              htmlFor="description"
            >
              description
            </label>
            <textarea
              rows="5"
              className={descHasError ? 'input--error' : 'input'}
              type="text"
              placeholder="enter item description"
              id="description"
              value={enteredDesc}
              onChange={descChangeHandler}
              onBlur={descBlurHandler}
            />
          </div>

          <div className="add-item__form-group add-item__form-group--4">
            <label className="add-item__label heading-secondary u-margin-bottom">
              category
            </label>
            <div className="add-item__category">
              <input
                type="radio"
                name="category"
                onChange={categoryChangeHandler}
                value="breakfast"
                className="add-item__radio-input"
                id="breakfast"
              />
              <label htmlFor="breakfast" className="add-item__radio-label">
                breakfast
              </label>

              <input
                type="radio"
                name="category"
                onChange={categoryChangeHandler}
                value="lunch"
                className="add-item__radio-input"
                id="lunch"
              />
              <label htmlFor="lunch" className="add-item__radio-label">
                lunch
              </label>

              <input
                type="radio"
                name="category"
                onChange={categoryChangeHandler}
                value="snacks"
                className="add-item__radio-input"
                id="snacks"
              />
              <label htmlFor="snacks" className="add-item__radio-label">
                snacks
              </label>

              <input
                type="radio"
                name="category"
                onChange={categoryChangeHandler}
                value="dinner"
                className="add-item__radio-input"
                id="dinner"
              />
              <label htmlFor="dinner" className="add-item__radio-label">
                dinner
              </label>
            </div>
          </div>

          <div className="add-item__form-group add-item__form-group--5">
            <label className="add-item__label heading-secondary u-margin-bottom">
              type
            </label>
            <div className="add-item__category">
              <input
                type="radio"
                name="type"
                onChange={typeChangeHandler}
                value="veg"
                className="add-item__radio-input"
                id="veg"
              />
              <label htmlFor="veg" className="add-item__radio-label">
                veg
              </label>

              <input
                type="radio"
                name="type"
                onChange={typeChangeHandler}
                value="non-veg"
                className="add-item__radio-input"
                id="non-veg"
              />
              <label htmlFor="non-veg" className="add-item__radio-label">
                non-veg
              </label>
            </div>
          </div>

          <button
            className={
              isAdd
                ? 'button button--big button--primary u-margin-bottom-big'
                : 'button button--big button--white u-margin-bottom'
            }
          >
            confirm
          </button>
          {!isAdd && (
            <button
              type="button"
              className="button button--big button--primary u-margin-bottom-big"
              onClick={() => {
                deleteHandler(itemId);
              }}
            >
              delete
            </button>
          )}
        </form>
      ) : (
        <>
          <h1 className="u-margin-left">Login to add items</h1>
          <button
            type="button"
            className="button button--big button--primary"
            onClick={() => navigate('/ologin')}
          >
            login
          </button>
        </>
      )}
    </div>
  );
};

export default AddItem;
