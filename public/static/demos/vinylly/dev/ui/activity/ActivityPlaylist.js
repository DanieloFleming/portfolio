import React from "react";
import ReactDOM from "react-dom";
import PlaylistItem from "../element/PlaylistItem.js";
import AudioPlayer from "../../class/MusicPlayer";

class ActivityPlaylist extends React.Component
{
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleTrackChange = this.handleTrackChange.bind(this);
        this.handlePlayChange = this.handlePlayChange.bind(this);

        this.state = {
            playlist : props.playlist,
            currentTrackId : AudioPlayer.id,
            isPlaying : AudioPlayer.isPlaying(),
            show : ''
        }
    }

    componentDidMount() {
        AudioPlayer.listenTo(AudioPlayer.Event.TrackChanged, this.handleTrackChange);
        AudioPlayer.listenTo(AudioPlayer.Event.PlayChange, this.handlePlayChange);

        this.timer = setTimeout(() => this.show(), 1);
    }

    show() {
        this.setState({show : 'show'});
        clearTimeout(this.timer);
    }

    componentWillUnmount() {
        AudioPlayer.unListenTo(AudioPlayer.Event.TrackChanged, this.handleTrackChange);
        AudioPlayer.unListenTo(AudioPlayer.Event.PlayChange, this.handlePlayChange);
    }
    render() {
        return(
            <div className={"activity " + this.state.show} data-activity="ActivityPlaylist">
                <header className="header"><h2 className="header-title">playlist</h2></header>
                <ul className="playlist">
                    {this.state.playlist.map((data, index) => 
                        <PlaylistItem 
                            key={index} 
                            id={data.id} 
                            data={data}
                            isSelected={this.state.currentTrackId == data.id}
                            isPlaying={this.state.isPlaying}
                            onClick={this.handleClick}
                        />
                    )}
                </ul>
            </div>
        );
    }

    handleClick(e) {
        const songData = AudioPlayer.playlist[e.currentTarget.getAttribute("data-id")]
        
        this.props.startActivity('RecordPlayer', songData);
    }

    handleTrackChange(e) {
        this.setState({currentTrackId : e.currentTrack.id});
    }

    handlePlayChange(e) {
        this.setState({isPlaying : e.isPlaying});
    }

}

export {ActivityPlaylist as default};
