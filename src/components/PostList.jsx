import React from 'react'
import { Col ,Card, Icon, Avatar,Typography} from "antd"
import TimeAgo from 'react-timeago'


const { Meta } = Card;
const { Text } = Typography;


const PostList = ({data:{id,username,body,likeCount,createdAt}}) => {
    
    const likePost=()=>{
        console.log("Liked")
    }
    const commentPost=()=>{
        console.log("Comment",id)
    }
    return (

           
        <Col style={{margin:19, minWidth: 200, wordBreak: "break-all"}} xs={30} sm={26} md={22} lg={7}>
          <Card
            title={username}
          
            extra={<Icon type="ellipsis" key="ellipsis" style={{ color: "red" }} /> }
            hoverable
            actions={[
                <div className="LikeButton" onClick={likePost} >
                    <Icon type="like" />
                    <Text  style={{marginLeft:15}}>{likeCount}</Text>
                </div>,
                <Icon className="LikeButton"  onClick={commentPost} type="ellipsis" key="ellipsis" />
            ]}
            >
            <Meta
              avatar={
                  <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                  R
                </Avatar>
              }
              
              description={body}
              />
              <div style={{float:"left",marginTop:15}}>
                  <Text >{username}</Text>
              </div>
              <div style={{position:'relative'}}>
                  <Text style={{display:'block',paddingTop:30,float:"right"}}><TimeAgo date={createdAt}/></Text>
              </div>
              
          </Card>
        </Col>

    )
}

export default PostList
