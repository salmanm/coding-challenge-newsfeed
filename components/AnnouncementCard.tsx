import styled from 'styled-components'
import Card from './Card'

type Props = {
  announcement: Announcement
}

type Announcement = {
  id: number
  fellowship: 'founders' | 'angels' | 'writers' | 'all'
  title: string
  body: string
  created_ts: string
  updated_ts: string
}

export default function AnnouncementCard({ announcement }: Props) {
  return (
    <Card>
      <Columns>
        <ColumnLeft>{announcement.title}</ColumnLeft>
        <ColumnRight>{announcement.body}</ColumnRight>
      </Columns>
    </Card>
  )
}

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`
