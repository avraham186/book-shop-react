import { eventBusService } from '../services/event-bus-service.js'

const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

  removeEvent;

  state = {
    carCount: 0
  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    this.removeEvent = eventBusService.on('book-count', (bookCount) => {
      this.setState({ bookCount })
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {

    return (
      <nav className="app-header">
        <span className="books-number">
          Number of books {this.state.carCount}
        </span>
        <ul className="clean-list">
          <li><NavLink exact to="/" activeClassName="active-nav">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><button onClick={() => {
            this.props.history.push('/')
          }}>Back</button></li>
        </ul>
      </nav>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)