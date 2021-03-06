local Observer = require('utils.observer')
local Timer = require('oop.timer')
local Native = require('native')

---@class BattleGroundMgr: Observer
BattleGroundMgr = Observer:new()

function BattleGroundMgr:init()
    self.currentOnMap = 0
    self.loseValue = 900

    self:registerEvent(Events.PlayerLeave, function(player)
        Message:toAll(string.format(L['|c00FF0000Player %s leaves the game. His spawnunits will kill directly!|r'],
                            player:getName()))
        for _, unit in ipairs(DarkSummoner[player]) do
            unit:setExploded(true)
            unit:kill()
        end

        for unit in player:iterateUnits() do
            unit:delete()
        end
    end)

    for _, player in ipairs(PlayerMgr:getPlayers()) do
        Unit:create(player, FourCC('uaco'), player:getStartPos(), bj_UNIT_FACING)
        player:setState(PlayerState.ResourceGold, GameConfig.InitGold)
    end

    PlayerMgr:getBirthPlayer():setState(PlayerState.GivesBounty, 1)
    PlayerMgr:getWavePlayer():setState(PlayerState.GivesBounty, 1)

    Native.FogMaskEnable(false)
    Native.FogEnable(false)

    self:registerEvent(Events.GameModeFinished, function()
        self.timerCheckAlive = Timer:create()
        self.timerCheckAlive:start(9, function()
            self:checkAlive()
        end)

        -- 检查输赢
        self.timerCheckLose = Timer:create()
        self.timerCheckLose:start(0.44, function()
            self:checkLose()
        end)
    end)

    self:registerEvent(Events.GameVictory, Events.GameLose, function()
        self:clear()
    end)

    ---@param unit Unit
    self:registerEvent(Events.UnitEnterBattleground, function(unit)
        self.currentOnMap = self.currentOnMap + 225 / WaveMgr:getInfo(unit:getLevel()).count
    end)

    local trigger = Trigger:create()
    trigger:registerPlayerUnitEvent(PlayerMgr:getWavePlayer(), PlayerUnitEvent.UnitDeath, nil)
    trigger:registerPlayerUnitEvent(PlayerMgr:getBirthPlayer(), PlayerUnitEvent.UnitDeath, nil)
    trigger:addAction(function()
        local unit = Event:getDyingUnit()
        self:fireEvent(Events.EnemyDeath, Event:getKillingUnit():getOwner(), unit)
        if unit:getOwner() == PlayerMgr:getWavePlayer() then
            self.currentOnMap = self.currentOnMap - 255.0 / WaveMgr:getInfo(unit:getLevel()).count
        end
        unit:setExploded(true)
        unit:kill()
    end)
end

function BattleGroundMgr:checkAlive()
    self.currentOnMap = 0
    for u in PlayerMgr:getWavePlayer():iterateUnits(Unit.isAlive) do
        local data = WaveMgr:getInfo(u:getLevel())
        if data then
            self.currentOnMap = self.currentOnMap + 225.0 / data.count
        end
    end
end

function BattleGroundMgr:checkLose()
    LeaderboardSetPlayerItemValueBJ(Player(11), udg_LEADERBOARD, R2I(((self.currentOnMap / self.loseValue) * 100.00)))

    if self.currentOnMap >= self.loseValue then
        Message:toAll(L['Sorry, you lost.  Try again!'])

        LeaderboardSetPlayerItemValueColorBJ(Player(11), udg_LEADERBOARD, 100, 0.00, 0.00, 0)

        local players = PlayerMgr:getPlayers()

        for i, p in ipairs(players) do
            for u in p:iterateUnits(Unit.isAlive) do
                u:delete()
            end
        end

        Timer:after(60, function()
            for i, p in ipairs(players) do
                p:remove(PlayerGameresult.Defeat)
                CustomDefeatDialogBJ(p:getUd(), L['Try again =)'])
            end
        end)

        self:fireEvent(Events.GameLose)
    end
end

function BattleGroundMgr:clear()
    if self.timerCheckAlive then
        self.timerCheckAlive:delete()
    end

    if self.timerCheckLose then
        self.timerCheckLose:delete()
    end
end

function BattleGroundMgr:getCurrentOnMap()
    return self.currentOnMap
end

BattleGroundMgr:init()
