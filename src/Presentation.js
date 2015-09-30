import React, { Component } from 'react';

<!--
// Poster
// [poster session] [time] [location]
// [Poster ID]: [Poster Title]
// [Presenter], [Presenter’s Organization]
// [Co-author(s)], [Co-author’s Organization] – repeated per number of co-authors


class Presentation extends Component {
  render() {
    { Authors, Description, Title, ID } = this.props;
    return (
      <div class="poster">
        <div class="meta-data">
          <p class="posterID">{ID}</p>
          <h2 class="posterTitle">{Title}</h2>
          <ul class="authors">
            {/* <!-- presenter prints out first, presenter with value of "1" in the json indicated they are the presenter --> */}
            <li class="presenter"><span class="name">{Firstname} {Lastname}</span>, <span class="company">{Company}</span></li>
            {/* <!-- repeat for each co-author? if presenter is 0, then give class co-author--> */}
            <li class="co-author"><span class="name">{Firstname} {Lastname}</span>, <span class="company">{Company}</span></li>
          </ul>
        </div>
      </div>
    );
  }
}
