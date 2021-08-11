export class LongTxt extends React.Component {
    state = {
        toggle: false
    }

    descText = () => {
        const { isLongTxtShown, text } = this.props
        const toggle = this.state.toggle
        if (isLongTxtShown && !toggle) {
            return text.substr(0, 100) + '...'

        } else if (isLongTxtShown && toggle) {
            return text

        } else {
            return text
        }
    }
    readMore = (ev) => {
        this.setState({ toggle: !this.state.toggle })
        if (this.state.toggle) {
            ev.target.innerText = 'Read More'
        } else {
            ev.target.innerText = 'Read Less'
        }
    }
    render() {
        return (
            < div >
                {this.descText()} <br />
                <button className="read-more-btn" onClick={this.readMore}>Read More</button>
            </div>
        )
    }
}