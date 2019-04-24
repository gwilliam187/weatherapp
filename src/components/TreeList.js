import React from 'react';
import { connect } from 'react-redux';

class TreeList extends React.Component{
	renderList(){
		if	(this.props.trees.length>0){
			return this.props.trees.map(tree=>{
				return(
					<div className='d-flex border-top border-bottom' key={tree._id}>
						<div
							className='mr-auto city-button-main'
							onClick={ this.handleCityClick }>
							<div className='name'>{ tree.description }</div>
							<div className='ref'>{ tree._id n}</div>
						</div>
					</div>
				)
			})
		}else {
			return (
				<div className='default'>Trees empty</div>
			);
		}
	}

	render() {
		return (
			<div className='col-12 card mb-3'>
				<div className='card-body'>
					<label>Trees</label>
					{ this.renderList() }
				</div>
			</div>
		);
	}
}

const mapStateToProps = state=>{
	return {
		trees: state.trees
	}
}

export default connect(mapStateToProps ,null) (TreeList)