// import React from 'react';

// function Recipe (props) {
//     const {
//       name,
//       title,
//       description,
//       image,
//       ingredients,
//       preparation
//     } = props.recipe;

//     return (
//       <>
//         <img
//           src={`http://oit2.scps.nyu.edu/~devereld/intermediate/img/${image}`}
//           alt={name}
//         />
//         <h3>{title}</h3>
//         <p>{description}</p>
//         <h4>Ingredients</h4>
//         <ul>
//           {ingredients.map(ingredient => (
//             <li>{ingredient}</li>
//           ))}
//         </ul>
//         <h4>Preparation</h4>
//         <ul>
//           {preparation.map(prep => (
//             <li>{prep.step}</li>
//           ))}
//         </ul>
//       </>
//     );
// }

// export default Recipe;

import React from 'react';
import { Link } from '@reach/router';
import {getImage, decode} from './utils';
import deleteSvg from '../img/delete.svg';

// const style = {
//   deletebtn: {
//     src: deleteSvg,
    
//   }
// }

class Recipe extends React.Component {
  
  render() {
    const {
      _id,
      title,
      description,
      campbellsId,
      image,
    } = this.props.recipe;
    console.log(this.props)
    return (
      
      <div className="entry">
      <div className="entryImg">
        <Link to={`/recipe/${_id}`}><img className='mainImg'
          src={getImage({campbellsId, image})}
          alt={decode(this.props.recipe.name)}
        /></Link>
        </div>
        <div className="entryDesc">
        <h2>
          <Link to={`/recipe/${_id}`}>{decode(title)}</Link>
        </h2>
        <p dangerouslySetInnerHTML={{__html: decode(description)}}></p>
        </div>
        <div>
        <Link to='/' onClick={() => this.props.removeRecipe({id: _id, index: this.props.index})} style={{float: 'right'}}><img
          src={deleteSvg}
          height='20'
          alt='delete'
        /></Link>
        </div>
      </div>
    );
  }
}

export default Recipe;