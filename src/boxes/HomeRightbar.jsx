import { useNavigate } from "react-router-dom"

function HomeRightbar({ authStatus }) {
    const navigate = useNavigate()
    const navItems = [
        { name:'Home',slug: "/",active:authStatus},
        { name: 'SeeAllPosts', slug: "/all-posts", active: authStatus, },
        { name: 'All blogs', slug: "/all-network", active: authStatus, },
    ]
    return (
        <>
            <div style={{ backgroundColor: "yellow", marginTop: "30%", height: "85%" }}  >

                {navItems.map((item) => item.active ?
                    (<div key={item.name} style={{ margin: "12px", marginBottom: "50px" }}>
                        <button onClick={() => navigate(item.slug)}
                        >{item.name}</button>
                    </div>) : (null)
                )}
            </div>
        </>
    )
}

function HomeLeftbar({ authStatus }) {
    const navigate = useNavigate()
    const navItems = [
        { name: 'Logout', slug: "/logout", active: authStatus, },
        { name: 'AddBlog', slug: "/add-blog", active: authStatus, },
        { name: 'AddPost', slug: "/add-post", active: authStatus, },
    ]
    return (
        <>
            <div style={{ backgroundColor: "yellow", marginTop: "30%", height: "85%" }}  >

                {navItems.map((item) => item.active ?
                    (<div key={item.name} style={{ margin: "12px", marginBottom: "50px" }}>
                        <button onClick={() => navigate(item.slug)}
                        >{item.name}</button>
                    </div>) : (null)
                )}
            </div>
        </>
    )
}

export {
    HomeLeftbar,
    HomeRightbar
}