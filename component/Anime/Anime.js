import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import { getPost } from '../../asset/js/get'
import { $theme } from '../../asset/js/const'
import ListView from '../ListView/ListView'

export default function Home(props) {
  const [post, setPost] = useState([])
  const map = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六'
  }
  useEffect(() => {
    getPost('新番', '', 1, 10).then(res => {
      let ret = []
      for (const k in map) ret.push({ title: map[k], data: [] })
      res.posts.forEach(item => {
        const time = item.time.replace(/\-/g, '/')
        let day = new Date(time).getDay().toString()
        let data = ret[day].data
        data.push(item)
      })
      setPost(ret)
    })
  }, [])
  return (
    <View style={s.container}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor='transparent' />
      <Text style={s.title}> UGC </Text>
      <ListView sections={post} />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    color: $theme,
    paddingLeft: 20,
    paddingBottom: 10
  }
})
