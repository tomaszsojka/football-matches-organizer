import React from "react";
import "./Posts.css";


export const MainPosts = (props) => {
    return (
        <main role="main">
            {/* key added because of error */}
            {props.posts.map((post) => 
            <article key={post.id} className="article-recent">
                <div className="article-recent-main">
                    <h2 className="article-title">{post.title}</h2>
                    <p className="article-body">{post.content}</p>
                    <a href="/" className="article-read-more">CONTINUE READING</a>
                </div>
                <div className="article-recent-secondary">
                    <img src="Images/white_n_flower.jpg" alt="" className="article-image"/>
                    <p className="article-info">{post.info}</p>
                </div>
            </article>)}

            {/* <article className="article-recent">
                <div className="article-recent-main">
                    <h2 className="article-title">Finding simplicity in life</h2>
                    <p className="article-body">
                        <strong>Life can get complicated really quickly</strong>, but it doesn't have to be! 
                        There are many ways to simplify your life, <a href="/#">a few of which we've explored in the past. </a> 
                        This week we're taking a bit of a approach though, in how you can find simplicity in the life you already living.
                    </p>
                    <a href="/" className="article-read-more">CONTINUE READING</a>
                </div>
                <div className="article-recent-secondary">
                    <img src="Images/white_n_flower.jpg" alt="" className="article-image"/>
                    <p className="article-info">July 23, 2019 | 3 comments</p>
                </div>
            </article>
            
            <article className="article-recent">
                <div className="article-recent-main">
                    <h2 className="article-title">Keeping cooking simple</h2>
                    <p className="article-body">
                        Food is a very important part of everyone's life. If you want to be healthy, you have to eat healthy. 
                        One of the easiest ways to do that is to keep your cooking nice and simple.
                    </p>
                    <a href="/" className="article-read-more">CONTINUE READING</a>
                </div>
                <div className="article-recent-secondary">
                    <img src="Images/white_n_flower.jpg" alt="" className="article-image"/>
                    <p className="article-info">July 19, 2019 | 3 comments</p>
                </div>
            </article>
            <article className="article-recent">
                <div className="article-recent-main">
                    <h2 className="article-title">Simplicity and work </h2>
                    <p className="article-body">
                        Work is often a major source of stress. People get frustrated, it ruins their relationship with others and it leads to burnout. 
                        By keeping your work life as simple as possible, it will help balance everything out.
                    </p>
                    <a href="/" className="article-read-more">CONTINUE READING</a>
                </div>
                <div className="article-recent-secondary">
                    <img src="Images/white_n_flower.jpg" alt="" className="article-image"/>
                    <p className="article-info">July 12, 2019 | 3 comments</p>
                </div>
            </article>
            <article className="article-recent">
                <div className="article-recent-main">
                    <h2 className="article-title">Simple decorations</h2>
                    <p className="article-body">
                        A home isn't a home until you've decorated a little. 
                        People either don't decorate, or they go overboard and it doesn't have the impact they were hoping for. 
                        Staying simple will help draw the eye where you want it to and make things pop like never before.
                    </p>
                    <a href="/" className="article-read-more">CONTINUE READING</a>
                </div>
                <div className="article-recent-secondary">
                    <img src="Images/white_n_flower.jpg" alt="" className="article-image"/>
                    <p className="article-info">July 3, 2019 | 3 comments</p>
                </div>
            </article> */}
        </main>
    );
}